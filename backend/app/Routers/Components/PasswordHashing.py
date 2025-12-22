from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError

ph = PasswordHasher()

def hashPassword(rawPassworad: str) -> str:
    return ph.hash(rawPassworad)

def verifyPassworad(rawPassworad: str, hashPassworad: str) -> bool:
    try: 
        return ph.verify(hash=hashPassworad, password=rawPassworad)
    except VerifyMismatchError:
        return False