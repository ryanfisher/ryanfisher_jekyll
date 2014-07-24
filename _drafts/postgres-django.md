---
layout: essay
title: Getting postgres set up for django
---

https://help.ubuntu.com/community/PostgreSQL

django.db.utils.OperationalError: fe_sendauth: no password supplied

After I got the above error, I changed the host in the database settings from localhost to an empty string

from https://docs.djangoproject.com/en/dev/ref/settings/#std:setting-HOST
"""
If you’re using PostgreSQL, by default (empty HOST), the connection to the database is done through UNIX domain sockets (‘local’ lines in pg_hba.conf). If your UNIX domain socket is not in the standard location, use the same value of unix_socket_directory from postgresql.conf. If you want to connect through TCP sockets, set HOST to ‘localhost’ or ‘127.0.0.1’ (‘host’ lines in pg_hba.conf). On Windows, you should always define HOST, as UNIX domain sockets are not available.
"""

django.db.utils.OperationalError: FATAL:  role "ryan" does not exist

After seeing this error, postgres needed a new superuser, which I got by running:
sudo -u postgres createuser ryan
