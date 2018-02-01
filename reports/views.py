from django.http import JsonResponse

# Create your views here.
def workspace_report(request, workspace):
	if workspace != "my_workspace_1":
		return JsonResponse({"error_message": "Invalid workspace"},status=404)

	return JsonResponse({
		"datasets": []
	})

def subset_report(request, workspace, subset):
	if workspace != "my_workspace_1" or subset != "my_subset_1":
		return JsonResponse({"error_message": "Invalid workspace or subset"},status=404)

	return JsonResponse({
		"datasets": []
	})