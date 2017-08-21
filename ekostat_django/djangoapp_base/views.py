
from django.shortcuts import render

def view_introduction(request):
    """ """
    return render(request, "introduction.html", {})

def view_documentation(request):
    """ """
    return render(request, "documentation.html", {})

def view_about(request):
    """ """    
    return render(request, "about.html", {})

def view_work_in_progress(request):
    """ """    
    return render(request, "work_in_progress.html", {})
