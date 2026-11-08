const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const registry = fs.existsSync(path.join(root, '06_작업기록/시나리오_개정안.json'))
  ? '06_작업기록/시나리오_개정안.json' : 'content/revisions.json';
const revisions = JSON.parse(fs.readFileSync(path.join(root, registry), 'utf8'));
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function readScenario(file) {
  const parts = fs.readFileSync(path.join(root, file), 'utf8').replace(/\r\n/g, '\n').trim().split(/\n\n/);
  return {title: parts[0].replace(/^# /, ''), note: parts[1], body: parts.slice(2).join('\n\n')};
}
const main = fs.existsSync(path.join(root, 'content')) ? 'index.html' : '한국사_시나리오_사이트.html';
for (const revision of revisions) {
  const baseline = readScenario(revision.baselinePath);
  const draft = readScenario(revision.sourcePath);
  const article = (s, label, file, id) => `<article id="${id}"><div class="badge">${esc(label)}</div><h2>${esc(s.title)}</h2><p class="note">${esc(s.note)}</p><p class="note">${s.body.length}자 · <a href="${esc(file)}">원본 글 열기</a></p><div class="script">${esc(s.body)}</div></article>`;
  const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>신석기 시나리오 개정안 비교</title><style>
*{box-sizing:border-box}body{margin:0;background:#f5f3ee;color:#263c32;font-family:system-ui,"Malgun Gothic",sans-serif;line-height:1.8}main{max-width:1380px;margin:auto;padding:30px 24px 60px}a{color:#476c58;text-underline-offset:4px}header{margin:24px 0}h1{font-size:clamp(26px,4vw,38px);line-height:1.35;margin:16px 0}h2{font-size:23px;line-height:1.5;margin:16px 0}.intro{max-width:760px;color:#58695c}.compare{display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:start}article{background:white;border:1px solid #dce4dc;border-radius:16px;padding:30px}.badge{display:inline-block;border-radius:30px;background:#e6efdf;padding:5px 13px;font-size:13px;font-weight:700}#revision .badge{background:#f4e4d5;color:#845437}.note{font-size:13px;color:#68776b}.script{white-space:pre-wrap;font-size:17px;line-height:2}nav{display:flex;gap:18px;flex-wrap:wrap;margin:20px 0}@media(max-width:850px){main{padding:20px 16px 40px}.compare{grid-template-columns:1fr}article{padding:23px}.script{font-size:16px}}
</style></head><body><main><a href="${main}">← 전체 시나리오로 돌아가기</a><header><p class="note">EPISODE 02 · 신석기 시대</p><h1>신석기 시나리오 개정안 비교</h1><p class="intro">${esc(revision.description || '1차 확정본과 새 개정안을 비교합니다. 새 개정안은 검토 대기입니다.')}</p><nav><a href="#revision">새 쇼츠 개정안</a><a href="#baseline">1차 확정본</a></nav>${revision.previousSourcePaths?.length?`<p class="note">이전 시안: ${revision.previousSourcePaths.map(file=>`<a href="${esc(file)}">유적 수사형 v001 원본</a>`).join(' · ')}</p>`:''}</header><div class="compare">${article(draft, revision.label, revision.sourcePath, 'revision')}${article(baseline, '1차 확정 · 사용자 승인', revision.baselinePath, 'baseline')}</div></main></body></html>\n`;
  fs.writeFileSync(path.join(root, revision.comparisonPage), html, 'utf8');
}
console.log(JSON.stringify({revisionComparisons: revisions.length}));
