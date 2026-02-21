from rest_framework import serializers
from .models import AboutModel

class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutModel
        fields = '__all__'

    def to_internal_value(self, data):
        import json
        
        # Make a mutable copy if it's a QueryDict
        if hasattr(data, '_mutable'):
            data._mutable = True
        elif not isinstance(data, dict):
            data = dict(data)
        else:
            data = data.copy()
        
        # Handle JSON fields if they come as strings (common in multipart/form-data)
        for field in ['tech_stack', 'tags']:
            if field in data and isinstance(data[field], str):
                try:
                    data[field] = json.loads(data[field])
                except json.JSONDecodeError:
                     pass # Let standard validation handle it if it's not valid JSON
                     
        return super().to_internal_value(data)
