
import logging

def test_print():
    """ """
    print('Test print...') # note: Avoid print in the production code.
    
    logger = logging.getLogger('EkoStatLogger')

    logger.info('Test logger-info')
    logger.warning('Test logger-warning')
    logger.error('Test logger-error')
    logger.debug('Test logger-debug')
    