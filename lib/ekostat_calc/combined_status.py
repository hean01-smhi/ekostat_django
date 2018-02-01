#!/usr/bin/python3
# -*- coding:utf-8 -*-
# Project: http://ecostat_tool.org
# Copyright (c) 2017 SMHI, Swedish Meteorological and Hydrological Institute 
# License: MIT License (see LICENSE.txt or http://opensource.org/licenses/mit).

import logging

import ekostat_calc

class CombinedStatusManager(object):
    """  """
    def __init__(self):
        """ """
        self._logger = logging.getLogger('EkoStatLogger')
        
    def open(self, data_package_path):
        """ """
        self._logger.info('CombinedStatusManager: Open...')
        try:
            pass # TODO:
        except Exception as e:
            self._logger.error('CombinedStatusManager: Exception.')
            try: self._logger.error('Exception: ' + e.message) 
            except: pass
        
    def save(self, data_package_path = None):
        """ """
        self._logger.info('CombinedStatusManager: Save...')
        try:
            pass # TODO:
        except Exception as e:
            self._logger.error('CombinedStatusManager: Exception.')
            try: self._logger.error('Exception: ' + e.message) 
            except: pass
        
    def close(self):
        """ """
        self._logger.info('CombinedStatusManager: Close...')
        try:
            pass # TODO:
        except Exception as e:
            self._logger.error('CombinedStatusManager: Exception.')
            try: self._logger.error('Exception: ' + e.message) 
            except: pass
        
    def clear(self):
        """ """
        self._logger.info('CombinedStatusManager: Clear...')
        try:
            pass # TODO:
        except Exception as e:
            self._logger.error('CombinedStatusManager: Exception.')
            try: self._logger.error('Exception: ' + e.message) 
            except: pass
        
    def calculate(self):
        """ """
        self._logger.info('CombinedStatusManager: Calculate...')
        try:
            pass # TODO:
        except Exception as e:
            self._logger.error('CombinedStatusManager: Exception.')
            try: self._logger.error('Exception: ' + e.message) 
            except: pass
        
