#!/usr/bin/python3
# -*- coding:utf-8 -*-
# Project: http://ecostat_tool.org
# Copyright (c) 2017 SMHI, Swedish Meteorological and Hydrological Institute 
# License: MIT License (see LICENSE.txt or http://opensource.org/licenses/mit).

import logging

import ekostat_calc

class DataManager(object):
    """  """
    def __init__(self):
        """ """
        self._logger = logging.getLogger('EkoStatLogger')
        
    def open(self, data_package_path):
        """ """
        self._logger.info('DataManager: Open...')
        try:
            pass # TODO:
        except Exception as e:
            self._logger.error('DataManager: Exception.')
            try: self._logger.error('Exception: ' + e.message) 
            except: pass
        
    def save(self, data_package_path = None):
        """ """
        self._logger.info('DataManager: Save...')
        try:
            pass # TODO:
        except Exception as e:
            self._logger.error('DataManager: Exception.')
            try: self._logger.error('Exception: ' + e.message) 
            except: pass
        
    def close(self):
        """ """
        self._logger.info('DataManager: Close...')
        try:
            pass # TODO:
        except Exception as e:
            self._logger.error('DataManager: Exception.')
            try: self._logger.error('Exception: ' + e.message) 
            except: pass
        
    def clear(self):
        """ """
        self._logger.info('DataManager: Clear...')
        try:
            pass # TODO:
        except Exception as e:
            self._logger.error('DataManager: Exception.')
            try: self._logger.error('Exception: ' + e.message) 
            except: pass
        
    def calculate_all(self):
        """ """
        self._logger.info('DataManager: Calculate all...')
        try:
            pass # TODO:
        except Exception as e:
            self._logger.error('DataManager: Exception.')
            try: self._logger.error('Exception: ' + e.message) 
            except: pass
        
    def calculate_data(self):
        """ """
        self._logger.info('DataManager: Calculate data...')
        try:
            pass # TODO:
        except Exception as e:
            self._logger.error('DataManager: Exception.')
            try: self._logger.error('Exception: ' + e.message) 
            except: pass
        
