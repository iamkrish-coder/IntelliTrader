import boto3
import json
import logging
from botocore.exceptions import ClientError

# Configure logging
logging.basicConfig(level=logging.INFO)

def get_secret(secret, region):

    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name=region
    )

    try:
        response = client.get_secret_value(SecretId=secret)
        secret_data = response['SecretString']
        logging.info(f"Retrieving Secret Keys From AWS Secrets Manager ...COMPLETE!")
        return secret_data
    except ClientError as e:
        logging.error(f"Error retrieving secret: {e}")
        raise e
