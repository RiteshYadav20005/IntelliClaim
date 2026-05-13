import sys
from loguru import logger

logger.remove()
logger.add(
    sys.stdout, 
    format="{time:YYYY-MM-DD HH:mm:ss} | {level} | {message}", 
    level="INFO"
)

# Optional file logging
logger.add("logs/app.log", rotation="10 MB", retention="10 days", level="DEBUG")
