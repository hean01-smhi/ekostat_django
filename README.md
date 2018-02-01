# ekostat_django
Web application for the EKOSTAT-calculator.

### How to run Django, short intro

- Clone ekostat_django: git clone https://github.com/ekostat/ekostat_django.git
- Create a new virtual enivornment: virtualenv -p python3 ~/.virtualenvs/ekostat
- Activate the virtual environment: source ~/.virtualenvs/ekostat/bin/activate
- Change directory: cd ekostat_django/
- Install dependencies: pip install -r requirements.txt
- Launch the development server: python manage.py runserver
- Web address: localhost:8000

### EKOSTAT Calculator

The lib ekostat_calc should contain all software needed to run the calculator and 
will be developed in another github repository. 

The **ekostat_calc** version stored here is only a dummy implementation used to test 
and develop the web application. Should be removed later.

### Python modules and packages

These modules contains the public API for the calculator: 

- **ekostat_calculator.py** Contains the calculator class. 
- **data.py** Used for downloaded/uploaded data and filters.
- **quality_factors.py** Used for quality factors management.
- **combine_status.py** Used for management and calculation of the combined status.

Packages in ekostat_calc package are:

- **core** The core functionality of the calculator can be found here.
- **utils** Contains commonly used utilities.


### Jupyter notebook

The file ekostat_calculator_notebook_test.ipynb contains a Jupyter notebook used 
for test and as an early example of how the EKOSTAT calculator should be used from
a client software, for example the Django web application software.




