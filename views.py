from django.shortcuts import render
#from django.http import HttpResponse

# Create your views here.

def index(request):
    #return HttpResponse('Bienvenid@s a gotaWeb')
    return render(request,'gotaweb/index.html')

