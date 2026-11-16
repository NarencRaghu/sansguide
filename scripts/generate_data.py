#!/usr/bin/env python3
"""Generate clean resource + program data from the NS Resources Project workbook."""
import openpyxl, json, re, os, sys

SRC = os.path.expanduser("~/Downloads/NS Resources Project.xlsx")
OUT = sys.argv[1] if len(sys.argv) > 1 else "/tmp/out"
os.makedirs(OUT, exist_ok=True)

wb = openpyxl.load_workbook(SRC)

# ---- Website canonical categories ----
CATS = [
    "Mentorship & Networking",
    "Research Opportunities",
    "Clinical Exposure",
    "Education",
    "Application & Match Guidance",
    "Community",
    "Without a Home Program",
    "YouTube",
    "Research Fellowships",
]

def clean(v):
    if v is None:
        return ""
    return str(v).strip()

def map_categories(raw_cat):
    """Map a free-text category string to canonical website categories."""
    c = (raw_cat or "").lower()
    out = []
    def add(x):
        if x not in out:
            out.append(x)
    if re.search(r"mentor|network|leadership", c):
        add("Mentorship & Networking")
    if re.search(r"research", c):
        add("Research Opportunities")
    if re.search(r"clinic|sub-intern|subintern|sub intern|shadow|rotation|away|exposure", c):
        add("Clinical Exposure")
    if re.search(r"educat|anatomy|lecture|operative", c):
        add("Education")
    if re.search(r"applicat|match|scholarship", c):
        add("Application & Match Guidance")
    if re.search(r"communit", c):
        add("Community")
    return out

def parse_nohome(v):
    s = (v or "").strip().lower()
    if s.startswith("yes"):
        return "yes"            # specifically built for no-home-program students
    if s.startswith("not specifically"):
        return "general"        # accessible, not specific
    if "limited resources" in s or "encouraged to apply" in s:
        return "encouraged"     # not specific but encourages under-resourced students
    if s.startswith("no"):
        return "no"
    return "unknown"

URL_RE = re.compile(r"https?://[^\s]+")

def extract_resource_url(cell_text, hyperlink_target):
    """For social sheets, the real resource URL lives after 'Resource:' in text."""
    text = cell_text or ""
    post_url = None
    resource_url = None
    # find 'Resource:' segment
    m = re.search(r"Resource\s*:?\s*(https?://[^\s]+)", text, re.I)
    if m:
        resource_url = m.group(1).rstrip(" .,")
    m2 = re.search(r"Post\s*:?\s*(https?://[^\s]+)", text, re.I)
    if m2:
        post_url = m2.group(1).rstrip(" .,")
    if not post_url and hyperlink_target and ("instagram.com" in hyperlink_target or "x.com" in hyperlink_target or "twitter.com" in hyperlink_target):
        post_url = hyperlink_target
    # if no explicit resource url but text has a non-social url
    if not resource_url:
        for u in URL_RE.findall(text):
            if not re.search(r"instagram\.com|x\.com|twitter\.com", u):
                resource_url = u.rstrip(" .,")
                break
    return resource_url, post_url

def norm_name(n):
    s = (n or "").lower()
    s = re.sub(r"\(.*?\)", "", s)         # drop parentheticals
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    # common synonyms
    s = s.replace("neurosrugery", "neurosurgery").replace("resesarch", "research")
    return s

ALIASES = {
    "expanse": "EXPANSE",
    "expanding access to neurosurgery research education": "EXPANSE",
    "neurosurgery education and research virtual experience group nerve": "NERVE",
    "nerve": "NERVE",
    "neurosurgery education and research virtual experience nerve": "NERVE",
}

def canonical_key(name):
    n = norm_name(name)
    for frag, key in ALIASES.items():
        if frag in n:
            return key.lower()
    return n

resources = {}   # key -> resource dict
rid = 0

def hyperlinks_for(ws):
    hl = {}
    for row in ws.iter_rows():
        for cell in row:
            if cell.hyperlink:
                hl[cell.coordinate] = cell.hyperlink.target
    return hl

def add_resource(name, desc, url, access, founder, raw_cat, nohome, source, post_url=None):
    global rid
    name = clean(name)
    if not name:
        return
    key = canonical_key(name)
    cats = map_categories(raw_cat)
    nh = parse_nohome(nohome)
    if nh in ("yes",):
        if "Without a Home Program" not in cats:
            cats.append("Without a Home Program")
    if source == "YouTube" and "YouTube" not in cats:
        cats.append("YouTube")
    if not cats:
        cats = ["Education"]  # fallback, should rarely happen

    if key in resources:
        r = resources[key]
        # merge: prefer longer description, keep a resource url if we have one
        if len(clean(desc)) > len(r["description"]):
            r["description"] = clean(desc)
        if url and not r["url"]:
            r["url"] = url
        if clean(access) and not r["access"]:
            r["access"] = clean(access)
        if clean(founder) and not r["organization"]:
            r["organization"] = clean(founder)
        for c in cats:
            if c not in r["categories"]:
                r["categories"].append(c)
        # upgrade nohome status (yes > encouraged > general > no)
        rank = {"yes": 4, "encouraged": 3, "general": 2, "no": 1, "unknown": 0}
        if rank.get(nh, 0) > rank.get(r["noHomeStatus"], 0):
            r["noHomeStatus"] = nh
        if source not in r["sources"]:
            r["sources"].append(source)
        if raw_cat and raw_cat not in r["rawCategories"]:
            r["rawCategories"].append(raw_cat)
        if post_url and post_url not in r["postLinks"]:
            r["postLinks"].append(post_url)
        return

    rid += 1
    resources[key] = {
        "id": "r%03d" % rid,
        "name": name,
        "description": clean(desc),
        "url": url or "",
        "access": clean(access),
        "organization": clean(founder),
        "categories": cats,
        "rawCategories": [raw_cat] if raw_cat else [],
        "noHomeStatus": nh,
        "sources": [source],
        "postLinks": [post_url] if post_url else [],
    }

# ---------- Google ----------
ws = wb["Google"]; hl = hyperlinks_for(ws)
for i, row in enumerate(ws.iter_rows(min_row=2), start=2):
    vals = [clean(c.value) for c in row]
    if not any(vals):
        continue
    name, desc, link, access, founder, cat, nohome = (vals + [""]*7)[:7]
    url = hl.get("C%d" % i, link) or link
    add_resource(name, desc, url, access, founder, cat, nohome, "Google")

# ---------- reddit ----------
ws = wb["reddit"]; hl = hyperlinks_for(ws)
for i, row in enumerate(ws.iter_rows(min_row=2), start=2):
    vals = [clean(c.value) for c in row]
    if not any(vals):
        continue
    name, desc, reslink, access, founder, cat, nohome = (vals + [""]*7)[:7]
    post = vals[9] if len(vals) > 9 else ""
    url = hl.get("C%d" % i, reslink) or reslink
    post_url = hl.get("J%d" % i, post) or post
    add_resource(name, desc, url, access, founder, cat, nohome, "Reddit", post_url)

# ---------- Instagram ----------
ws = wb["Instagram"]; hl = hyperlinks_for(ws)
for i, row in enumerate(ws.iter_rows(min_row=2), start=2):
    vals = [clean(c.value) for c in row]
    if not any(vals):
        continue
    name, desc, linktext, access, founder, cat, nohome = (vals + [""]*7)[:7]
    res_url, post_url = extract_resource_url(linktext, hl.get("C%d" % i))
    add_resource(name, desc, res_url or "", access, founder, cat, nohome, "Instagram", post_url)

# ---------- Twitter ----------
ws = wb["Twitter"]; hl = hyperlinks_for(ws)
for i, row in enumerate(ws.iter_rows(min_row=2), start=2):
    vals = [clean(c.value) for c in row]
    if not any(vals):
        continue
    name, desc, linktext, access, founder, cat, nohome = (vals + [""]*7)[:7]
    res_url, post_url = extract_resource_url(linktext, hl.get("C%d" % i))
    add_resource(name, desc, res_url or "", access, founder, cat, nohome, "Twitter", post_url)

reslist = list(resources.values())
reslist.sort(key=lambda r: r["name"].lower())

# ---------- Program sheet -> programs.json ----------
ws = wb["Program"]; hl = hyperlinks_for(ws)
programs = []
pid = 0
for i, row in enumerate(ws.iter_rows(min_row=2), start=2):
    vals = [clean(c.value) for c in row]
    if not any(vals):
        continue
    name, pos, desc, linktext, req, cat, nohome = (vals + [""]*7)[:7]
    if not name:
        continue
    has_fellow = pos.strip().lower() == "yes"
    link = hl.get("D%d" % i, "") if has_fellow else ""
    # requirement cell may hold a mailto hyperlink
    req_link = hl.get("E%d" % i, "")
    pid += 1
    programs.append({
        "id": "p%03d" % pid,
        "name": name,
        "hasFellowship": has_fellow,
        "fellowshipName": clean(linktext) if has_fellow else "",
        "description": clean(desc),
        "link": link,
        "requirements": clean(req),
        "requirementLink": req_link if req_link and req_link.startswith("mailto:") else "",
        "builtForNoHome": nohome.strip().lower().startswith("yes"),
    })

programs.sort(key=lambda p: p["name"].lower())

with open(os.path.join(OUT, "resources.json"), "w") as f:
    json.dump(reslist, f, indent=2, ensure_ascii=False)
with open(os.path.join(OUT, "programs.json"), "w") as f:
    json.dump(programs, f, indent=2, ensure_ascii=False)

# stats
from collections import Counter
print("resources:", len(reslist))
catc = Counter(c for r in reslist for c in r["categories"])
for c in CATS:
    print("  ", c, catc.get(c, 0))
print("nohome statuses:", Counter(r["noHomeStatus"] for r in reslist))
print("resources missing url:", sum(1 for r in reslist if not r["url"]))
print("programs:", len(programs), "| with fellowship:", sum(1 for p in programs if p["hasFellowship"]))
