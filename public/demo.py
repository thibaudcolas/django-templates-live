import django
from django.conf import settings
from django.template import Context, Template
from pattern_library.utils import (
    mark_context_strings_safe,
    get_pattern_context_var_name,
)

INSTALLED_APPS = [
    "pattern_library",
    "slippers",
    "test_app",
]

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": False,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
            'loaders': [
                ('django.template.loaders.locmem.Loader', {
                    'button.html': """
<a href="{% if target_url %}{{ target_url }}{% endif %}" class="button button-rounded{% if theme == 'primary' %} button--primary{% else %} button--default{% endif %} {{ classname }}">
    {% if icon_before %}
        {% include 'icon.html' with name=icon_before classname='button__icon button__icon--before' %}
    {% endif %}
    {% if label %}{{ label }}{% endif %}
    {% if icon_after %}
        {% include 'icon.html' with name=icon_after classname='button__icon button__icon--after' %}
    {% endif %}
</a>
""",
                    'help_block.html': """
Hey help_block
""",
                    'icon.html': """
<svg class="icon icon--{{ name }}{% if classname %} {{ classname }}{% endif %}" aria-hidden="true">
    <use href="#{{ name }}"></use>
</svg>
""",
                    'quote_block.html': """
<blockquote class="quote-block block--spacing">
    <div class="quote-block__text">
        <p class="quote-block__quote heading--3">{{ quote }}</p>
        {% if attribution %}
            <p class="quote-block__attribution">{{ attribution }}</p>
        {% endif %}
    </div>
</blockquote>
""",
                }),
            ],
            "builtins": [
                "pattern_library.loader_tags",
                "slippers.templatetags.slippers"
            ],
        },
    },
]

X_FRAME_OPTIONS = "SAMEORIGIN"

PATTERN_LIBRARY = {
    # Groups of templates for the pattern library navigation. The keys
    # are the group titles and the values are lists of template name prefixes that will
    # be searched to populate the groups.
    "SECTIONS": (
        ("components", ["patterns/components"]),
        ("pages", ["patterns/pages"]),
    ),

    # Configure which files to detect as templates.
    "TEMPLATE_SUFFIX": ".html",

    # Set which template components should be rendered inside of,
    # so they may use page-level component dependencies like CSS.
    "PATTERN_BASE_TEMPLATE_NAME": "patterns/base.html",

    # Any template in BASE_TEMPLATE_NAMES or any template that extends a template in
    # BASE_TEMPLATE_NAMES is a "page" and will be rendered as-is without being wrapped.
    "BASE_TEMPLATE_NAMES": ["patterns/base_page.html"],
}

settings.configure(DEBUG=True, TEMPLATES=TEMPLATES, INSTALLED_APPS=INSTALLED_APPS)
django.setup()

def render_pattern(tpl, config=None):
    context = config.get("context", {})
    tags = config.get("tags", {})
    mark_context_strings_safe(context)
    context[get_pattern_context_var_name()] = True
    context["__pattern_library_tag_overrides"] = tags

    template = Template(tpl)
    # context = Context({"name": i})
    return template.render(Context(context))
