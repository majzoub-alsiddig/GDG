#!/usr/bin/env bash
# fix-tiptap-icons.sh
# Rewrites every broken `@/components/tiptap-icons/<icon>` import
# to point at the consolidated barrel: `@/components/icons`
set -euo pipefail

SRC_DIR="${1:-src}"

if [[ ! -d "$SRC_DIR" ]]; then
  echo "✗ Directory not found: $SRC_DIR" >&2
  exit 1
fi

echo "→ Scanning $SRC_DIR for broken tiptap-icons imports..."

# Collect every file that still references the deleted folder
mapfile -t FILES < <(
  grep -rl '@/components/tiptap-icons/' "$SRC_DIR" \
    --include='*.ts' --include='*.tsx' || true
)

if [[ ${#FILES[@]} -eq 0 ]]; then
  echo "✓ Nothing to fix — no broken imports found."
  exit 0
fi

echo "→ Found ${#FILES[@]} file(s):"
printf '   %s\n' "${FILES[@]}"
echo

for f in "${FILES[@]}"; do
  # 1. Special case: the tiptap link icon was renamed to LinkIconTiptap
  #    in the consolidated file to avoid clashing with the generic LinkIcon.
  sed -i -E \
    's|import \{[[:space:]]*LinkIcon[[:space:]]*\} from "@/components/tiptap-icons/link-icon"|import { LinkIconTiptap as LinkIcon } from "@/components/icons"|g' \
    "$f"

  # 2. Everything else: just redirect the module path.
  sed -i -E 's|@/components/tiptap-icons/[A-Za-z0-9_-]+|@/components/icons|g' "$f"

  echo "  ✓ $f"
done

echo
echo "✓ Done. Next steps:"
echo "    rm -rf .next node_modules/.cache"
echo "    npm run build"
