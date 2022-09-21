from django.template.defaulttags import register
from pattern_library.monkey_utils import override_tag

override_tag(register, name='now')
