def urlProofString(input):
    """
    Returns the string 'input' in a form that can be passed as (a part of) an URL string.
    Currently only affects forward slashes.
    """
    return input.replace("/", "&#x2F")

def decodeUrlProofString(input):
    """
    The inverse of urlProofString(), returns escaped characters to human readable form.
    """
    return input.replace("&#x2F", "/")