#!/usr/bin/python3
# -*- coding:utf-8 -*-
# Project: 
# Copyright (c) 2017 SMHI, Swedish Meteorological and Hydrological Institute 
# License: MIT License (see LICENSE.txt or http://opensource.org/licenses/mit).

import ekostat_calc

calc = ekostat_calc.EkoStatCalculator(log_to_stdout=True)

calc.open('calc_data_test')

calc.calculate_all()

calc.save('calc_data_test_1')