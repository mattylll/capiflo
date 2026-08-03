#!/usr/bin/env bash
# Wrapper around the dataforseo-content-engine skill scripts so they run with
# Capiflo's locale, entity list and output directory. Called by the npm seo:*
# scripts (package.json). Usage:
#
#   scripts/seo/engine.sh clusters "business loans" "asset finance"
#   scripts/seo/engine.sh serp "vat loans"
#   scripts/seo/engine.sh brief seo/articles-content-engine.json
#   scripts/seo/engine.sh entities "business loan calculator uk" [built.html] [slug]
#   scripts/seo/engine.sh density "business loans leeds" [built.html ...]
#
# See seo/CONTENT-PIPELINE.md for when to run which stage.
set -euo pipefail

SKILL_DIR="${DFS_ENGINE_DIR:-$HOME/.claude/skills/dataforseo-content-engine}"
TOOL="${1:?usage: engine.sh <clusters|serp|brief|entities|density> [args...]}"
shift

if [[ ! -f "$SKILL_DIR/scripts/$TOOL.mjs" ]]; then
    echo "dataforseo-content-engine not found at $SKILL_DIR (override with DFS_ENGINE_DIR)" >&2
    exit 1
fi

# Load DATAFORSEO_AUTH from .env.local if not already exported.
if [[ -z "${DATAFORSEO_AUTH:-}" && -f .env.local ]]; then
    export DATAFORSEO_AUTH="$(grep -E '^DATAFORSEO_AUTH=' .env.local | cut -d= -f2-)"
fi

# Capiflo defaults: UK locale, seo/ output tree, SME-finance entity list.
export LOC_CODE="${LOC_CODE:-2826}"
export LANG_CODE="${LANG_CODE:-en}"
export OUT_DIR="${OUT_DIR:-seo}"
export ENTITIES_FILE="${ENTITIES_FILE:-seo/entities-sme-finance.json}"

exec node "$SKILL_DIR/scripts/$TOOL.mjs" "$@"
