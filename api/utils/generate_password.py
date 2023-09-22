""" Generate user password """

# Python
import string
import secrets


def generate_user_password():
    """ Generate random password for user """
    alphabet = string.ascii_letters + string.digits
    password = ''.join(secrets.choice(alphabet) for i in range(8))
    return password
