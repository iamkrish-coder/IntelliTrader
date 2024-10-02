# Registration
import jwt
import time
from backend.constants.const import *
from backend.enumerations.enums import *
from backend.utils.logging_utils import *
from backend.models.users_model import UsersModel
from backend.api.BaseApi import BaseApi


class Register(BaseApi):

    def __init__(self, request):
        super().__init__()
        self.request_parameters = request

    def handle_request(self):
        # Generate JWT Token
        try:
            payload = {
                "userId": self.request_parameters.get('userId'),
                "userEmail": self.request_parameters.get('userEmail'),
            }
            token = jwt.encode(payload, SECRET_NAME, algorithm="HS256")

            # Add entry to AWS DynamoDB
            self.request_parameters["userId"] = self.generate_table_uid(TABLE_USERS)
            dataset = {
                "user_id": self.request_parameters.get('userId'),
                "user_name": self.request_parameters.get('userName'),
                "user_email": self.request_parameters.get('userEmail'),
                "user_password": self.request_parameters.get('userPassword'),
                "user_iam": self.request_parameters.get('userIam'),
                "created_date": time.strftime("%Y-%m-%d %H:%M:%S")
            }
            save_user = self.prepare_request_parameters(
                event=Events.PUT.value,
                table=Tables.TABLE_USERS.value,
                model=UsersModel,
                dataset=dataset
            )
            self.database.database_request(save_user)

            return {
                "message": "Registration successful!",
                "token": token
            }

        except Exception as error:
            log_error(f"Error generating JWT token: {error}")
            return {
                "message": "An error occurred during registration. Please try again later.",
                "error": "JWT_TOKEN_GENERATION_FAILED"
            }

