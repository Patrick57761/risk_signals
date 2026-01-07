from datetime import datetime, time, timedelta
import pytz

# Refresh 9:00 AM EST

EST = pytz.timezone("US/Eastern")

def current_macro_date() -> str:
    now = datetime.now(EST)
    cutoff = now.replace(hour=9, minute=0, second=0, microsecond=0)

    # macro_date is the day to be called
    if now < cutoff:
        macro_date = now.date() - timedelta(days=1)
    else:
        macro_date = now.date()

    return macro_date.isoformat()