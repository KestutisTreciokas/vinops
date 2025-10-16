# CI Patch Bundle — MS-MIG-00-02
Что сделать в удалённом репозитории:
1) Заменить `.github/workflows/cd.yml` содержимым из этого пакета (sha-теги, lowercase owner, без `:prod`).
2) Заменить `.github/workflows/deploy.yml` содержимым из этого пакета (ретег `sha-* → prod` только для production).
3) Убедиться, что `frontend/Dockerfile` присутствует (или обновить).
4) Запустить вручную `Build & Push to GHCR` (workflow_dispatch) на `main`. После success запустить `CD: Deploy…` на `production`.
