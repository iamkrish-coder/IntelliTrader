# Registration
import bcrypt
import jwt
import time
from backend.constants.const import *
from backend.enumerations.enums import *
from backend.utils.logging_utils import *
from backend.models.users_model import UsersModel
from backend.api.BaseApi import BaseApi


class Login(BaseApi):

    def __init__(self, request):
        super().__init__()
        self.request_parameters = request

    def handle_request(self):
        # Generate JWT Token
        try:
            payload = {
                "userEmail": self.request_parameters.get('userEmail'),
            }
            token = jwt.encode(payload, SECRET_NAME, algorithm="HS256")

            # Retrieve saved hashed password
            saved_login_credentials = self.get_user_login_credentials()
            if saved_login_credentials is not None:
                stored_password = saved_login_credentials[0]['user_password']

                # Rehash entered password with the correct salt
                entered_password = self.request_parameters.get('userPassword')

                # Compare hashed values
                if bcrypt.checkpw(entered_password.encode('utf-8'), stored_password.encode('utf-8')):
                    return {
                        "message": "Login successful",
                        "token": token
                    }
                else:
                    # Login failed (incorrect password)
                    return {
                        "message": "Invalid email or password. Please try again.",
                        "error": "INVALID_CREDENTIALS"
                    }
            else:
                return {
                    "message": "Email address not found. Sign up now if you're new.",
                    "error": "EMAIL_NOT_FOUND"
                }
        except Exception as error:
            log_error(f"Error during login verification: {error}")
            return {
                "message": "An error occurred during login check. Please try again later.",
                "error": "INVALID_CREDENTIAL_CHECK"
            }

    def hash_passwords(self):
        user_password = self.request_parameters.get('userPassword')
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(user_password.encode('utf-8'), salt)
        self.request_parameters['userPassword'] = hashed_password.decode('utf-8')
        self.request_parameters['userPasswordSalt'] = salt.decode('utf-8')

    def get_user_login_credentials(self):
        dataset = None
        user_email  = self.request_parameters.get('userEmail')

        lookup_user_params = self.prepare_request_parameters(
            event=Events.SCAN.value,
            table=Tables.TABLE_USERS.value,
            model=None,
            dataset=dataset,
            projection=["user_email, user_password, user_password_salt"],
            filters={
                "user_email": { "eq": user_email }
            }
        )
        return self.database_request(lookup_user_params)

