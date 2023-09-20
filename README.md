# Django for Nova

This extension aims to provide a suite of tools for working with Django projects in [Nova](https://nova.app):

* Django template language syntax highlighting, based on [tree-sitter-djangotemplate](https://github.com/nova-python/tree-sitter-djangotemplate)
* Django template language completions
* Commands for common operations like migrating or creating migrations
* Custom tasks for running (and debugging!) a local server or running a management command
* Formatting SQL files (using `sqlformat` from [sqlparse](https://sqlparse.readthedocs.io/en/latest/) already required by Django)

### TODO

* Option to include [Django checks](https://docs.djangoproject.com/en/4.2/topics/checks/) as issues
* Format selected SQL fragments
