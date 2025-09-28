#!/usr/bin/env awk -f
# openapi_patch.sh — idempotent awk patch for two issues:
#  1) add root-level `security: []` if absent before `paths:`
#  2) ensure `type: object` right after `currentLot:` (nullable case)
# Usage: awk -f openapi_patch.sh contracts/openapi.yaml > contracts/openapi.yaml.new && mv ...
BEGIN{
  root_security_seen=0; inserted_root_security=0
  in_currentlot=0; cl_indent=""; did_insert_type=0
}
function spaces(n,  s){ s=""; for(i=0;i<n;i++) s=s " "; return s }
{
  line=$0

  # track root-level security presence (zero indentation)
  if (match(line, /^[[:space:]]*security:[[:space:]]*\[/) && match(line, /^[^[:space:]]/)) {
    root_security_seen=1
  }

  # before the first top-level 'paths:' insert security: [] if missing
  if (match(line, /^[[:space:]]*paths:[[:space:]]*$/) && match(line, /^[^[:space:]]/)) {
    if (root_security_seen==0) {
      print "security: []"
      inserted_root_security=1
      root_security_seen=1
    }
  }

  # detect `currentLot:` line (any indentation)
  if (match(line, /^([[:space:]]*)currentLot:[[:space:]]*$/)) {
    print line
    cl_indent=substr(line, 1, RLENGTH-10)    # indent before 'currentLot:'
    did_insert_type=0

    # Peek next line (getline) to see if 'type:' follows; if not — insert type
    if (getline nxt > 0) {
      if (match(nxt, "^" cl_indent "  type:[[:space:]]")) {
        print nxt
      } else {
        print cl_indent "  type: object"
        did_insert_type=1
        print nxt
      }
      next
    } else {
      # EOF after currentLot: — still insert type and finish
      print cl_indent "  type: object"
      did_insert_type=1
      next
    }
  }

  print line
}
END{
  # no-op
}
