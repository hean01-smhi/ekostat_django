import jwt
import datetime

from django.conf import settings
from django.utils.encoding import smart_text


class JsonWebTokenGenerator:
    algorithm = 'HS256'
    expiration_delta = datetime.timedelta(days=7)
    secret = settings.SECRET_KEY

    def create_token(self, user):
        payload = {
            'iat': datetime.datetime.utcnow(),
            'exp': datetime.datetime.utcnow() + self.expiration_delta,
            '_id': user.pk,
            user.USERNAME_FIELD: user.get_username(),
        }
        return smart_text(jwt.encode(payload, self.secret, algorithm=self.algorithm))

    def verify_token(self, token):
        options = {'require_iat': True, 'require_exp': True}
        return jwt.decode(token, self.secret, algorithms=self.algorithm, options=options)


json_web_token_generator = JsonWebTokenGenerator()


DecodeError = jwt.DecodeError
ExpiredSignatureError = jwt.ExpiredSignatureError
