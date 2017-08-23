#!/usr/bin/python3
# -*- coding:utf-8 -*-
# Project: 
# Copyright (c) 2017 SMHI, Swedish Meteorological and Hydrological Institute 
# License: MIT License (see LICENSE.txt or http://opensource.org/licenses/mit).

import logging
from logging.handlers import RotatingFileHandler
from logging import handlers
import sys

import ekostat_calc

class EkoStatCalculator(object):
    """ Main class for the Ecological Status Calculator. """
    def __init__(self, 
                 log_file_name='ekostat_calculator_log.txt',
                 log_to_stdout=False):
        """ """
        self._logger = logging.getLogger('EkoStatLogger')
        self._setup_logger(log_file_name, log_to_stdout)
        
        self._logger.info('')
        self._logger.info('Welcome to the Ecological status calculator')
        self._logger.info('===========================================')
        self._logger.info('')
        
        self._data_package_path = None
        self._data_manager = ekostat_calc.DataManager()
        self._quality_elements_manager = ekostat_calc.QualityFactorsManager()
        self._combined_status_manager = ekostat_calc.CombinedStatusManager()
        
    def open(self, data_package_path):
        """ """
        self._logger.info('EkoStatCalculator: Open...')
        self._data_package_path = data_package_path
        self._data_manager.open(data_package_path)
        self._quality_elements_manager.open(data_package_path)
        self._combined_status_manager.open(data_package_path)
        
    def save(self, data_package_path = None):
        """ """
        self._logger.info('EkoStatCalculator: Save...')
        self._data_manager.save(data_package_path)
        self._quality_elements_manager.save(data_package_path)
        self._combined_status_manager.save(data_package_path)
        
    def close(self):
        """ """
        self._logger.info('EkoStatCalculator: Close...')
        self._data_manager.close()
        self._quality_elements_manager.close()
        self._combined_status_manager.close()
        self._data_package_path = None
        
    def clear(self):
        """ """
        self._logger.info('EkoStatCalculator: Clear...')
        self._data_package_path = None
        self._data_manager.clear() 
        self._quality_elements_manager.clear() 
        self._combined_status_manager.clear() 
        
    def calculate_all(self):
        """ """
        self._logger.info('EkoStatCalculator: Calculate all...')
        self.calculate_data() 
        self.calculate_quality_factors() 
        self.calculate_combined_status()
        
    def calculate_data(self):
        """ """
        self._logger.info('EkoStatCalculator: Calculate data...')
        
    def calculate_quality_factors(self):
        """ """
        self._logger.info('EkoStatCalculator: Calculate quality factors...')
        
    def calculate_combined_status(self):
        """ """
        self._logger.info('EkoStatCalculator: Calculate combined status...')
        
    def get_data_manager(self):
        """ """
        return self._data_manager
        
    def get_quality_elements_manager(self):
        """ """
        return self._quality_elements_manager
        
    def get_combined_status_manager(self):
        """ """
        return self._combined_status_manager
        
    # Not public:

    def _setup_logger(self, log_file_name, log_to_stdout=False):
        """ """
        logger = logging.getLogger('EkoStatLogger')
        logger.setLevel(logging.DEBUG)
        # logger_format = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
        logger_format = logging.Formatter('%(asctime)s %(levelname)-10s : %(message)s ')
        
        if log_to_stdout:
            ch = logging.StreamHandler(sys.stdout)
            ch.setFormatter(logger_format)
            logger.addHandler(ch)
        
        fh = handlers.RotatingFileHandler(log_file_name, maxBytes=(10000), backupCount=3)
        fh.setFormatter(logger_format)
        logger.addHandler(fh)
        


