
import urllib.request
import logging
import time

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("uvicorn")

URL = "http://127.0.0.1:8000/"
INTERVAL = 600

def Task() -> None:
    while True:
        try:
            with urllib.request.urlopen(URL, timeout=10) as response:
                if response.status == 200:
                    logger.info("Application and background task is running")
                else:
                    logger.info(f"Status code: {response.status}")
        except Exception as e:
            logger.info(f"Request failed: {e}")

        time.sleep(INTERVAL)