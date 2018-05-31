from django.conf import settings

from lib.ekostat_calculator.event_handler import EventHandler


def get_calculator(user_id):
    return EventHandler(
        user_id=user_id,
        workspace_directory=settings.EKOSTAT_CALCULATOR_WORKSPACE_DIR,
        resource_directory=settings.EKOSTAT_CALCULATOR_RESOURCE_DIR,
        log_directory=settings.EKOSTAT_CALCULATOR_LOG_DIR,
    )
