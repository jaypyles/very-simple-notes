# Build python dependencies
FROM python:3.10-slim AS pybuilder

RUN apt update && apt install -y uvicorn
RUN python -m pip --no-cache-dir install pdm
RUN pdm config python.use_venv false

COPY pyproject.toml pdm.lock /project/app/
COPY ./api /project/app/api
COPY ./build/ /project/app/build

WORKDIR /project/app
RUN pdm install

# Create final image
FROM python:3.10-slim

ENV PYTHONPATH=/project/pkgs
COPY --from=pybuilder /usr/local/lib/python3.10/site-packages /usr/local/lib/python3.10/site-packages
COPY --from=pybuilder /usr/local/bin /usr/local/bin
COPY --from=pybuilder /project/app /project/

EXPOSE 8000

WORKDIR /project

CMD [ "pdm", "run", "python", "-m", "uvicorn", "api.backend.app:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]

