release: npm --prefix handbook-ui-react install && npm --prefix handbook-ui-react run build && python manage.py collectstatic --noinput
web: gunicorn Unimelb-Handbook.wsgi --log-file -