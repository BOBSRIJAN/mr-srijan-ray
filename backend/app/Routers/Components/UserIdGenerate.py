import secrets
import string

def randomBlock(length: int)-> str:
    """ Generate a random string block of given length 
    
    Args:
        length (int): Length of the random string block to generate
        
    Returns:
        str: Randomly generated string block
    """
    chars = string.ascii_lowercase + string.digits
    return ''.join(secrets.choice(chars) for _ in range(length))

def generateId()-> str:
    """ Generate a random User ID consisting of four blocks separated by hyphens
    Args:
        None    
    Returns:
        str: Randomly generated User ID
    """
    return f"{randomBlock(8)}-{randomBlock(8)}-{randomBlock(8)}-{randomBlock(8)}"