# 限流类
from rest_framework.throttling import UserRateThrottle

__all__ = {
    'OncePerDayUserThrottle'
}


class OncePerDayUserThrottle(UserRateThrottle):
    rate = '1/day'

    def __init__(self, rate_frequency=50000):
        super().__init__()
        self.rate = f"{rate_frequency}/day"
