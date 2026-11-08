# 한국사 이야기 작업실

선사부터 현대까지 9개 시대·100개 주제의 영상 나레이션 초안입니다.

사이트: https://aicatveo3-prog.github.io/history-auto-test1/

## 수정하기

`01_스토리`의 현재 시대별 Markdown 네 파일을 수정하고 `node scripts/build.cjs`를 실행합니다. `node scripts/check.cjs`로 주제 수와 링크를 확인합니다. 결과를 main 브랜치에 푸시하면 GitHub Pages가 갱신됩니다.

`content/approvals.json`은 사용자 승인 기록, `content/story-files.json`은 현재 원고 목록, `content/topics.json`은 주제와 이론 자료입니다. 전체 모음과 HTML은 생성물이므로 시대별 원고를 수정하는 것이 좋습니다. 비교 시안은 `01_스토리/비교시안`에 있습니다.

## 편집 방향

중복된 요약은 줄이고, 정책의 작동과 이해관계는 구체적으로 설명합니다. 구석기는 확정, 신석기는 1차 확정이며 나머지 원고는 초안입니다. 승인 범위는 시나리오 문안이고, 실제 음성 낭독 시간은 측정하지 않았습니다. 학습용 정리는 공식 시험 해설이 아닙니다.

GitHub Pages: main 브랜치의 루트 디렉터리. 별도의 설치나 서버 없이 정적 파일로 동작합니다.
