# Out Of Box - Wagtail

[Timothé joubert](https://timothejoubert.com) – [screen-club](https://screen-club.com)

## Basic local developement

Install and clone the repo using virtual environnement. See deploy section above

`python manage.py makemigrations `

`python manage.py migrate `

`python manage.py runserver`

`python manage.py collectstatic`

## Tech

Install new App :
python manage.py startapp [name]

## Working with vite template

Edit files in outofbox-js
Be sure to add symlinks
cd outofbox-js
ln -s ../../../outofbox-js vite
ln -s ../../../outofbox-js/dist dist

When done, build vite :
vite build

## How to install on Ubuntu and deploy

1.  Install nginx and uwsgi your server

    sudo apt update
    sudo apt install nginx uwsgi

2.  Clone the repository of the project, usually located `/var/www/vhosts/outofbox`
3.  Ensure you have added the media folder and database file to the root project
4.  Create a virtual environment using Python and install the required dependencies

    `python -venv /var/www/vhosts/outofbox`

    `cd /var/www/vhosts/outofbox`

    `source bin/activate`

    `pip install -r requirements.txt`

5.  After this point, you can verify that everything works and perform migrations if needed

    `python manage.py runserver`

6.  (optional) Make sure that wsgi is running from the uWgsi endpoint if everything is working properly

    `uwsgi --http :5000 --wsgi-file outOfBox/wsgi.py`

7.  Enable nginx configuration by creating a configuration file, and then copying and editing the sample configuration file available here [sample configuration file here](https://github.com/timothejoubert/out-of-box/blob/main/configs/nginx)

    `sudo nano /etc/nginx/sites-available/outofbox.com `

8.  Make sure all paths and domain names on the configuration file are correct, then restart NGINX

    `sudo service nginx restart `

9.  Update your DNS to point to your server IP address, and run uWGSI (using socket) to verify the setup.

    `uwsgi --socket outofbox.sock --wsgi-file outOfBox/wsgi.py --chmod-socket=666`

10. Create a service and enable it to make the app run forever and [copy file from here](https://github.com/timothejoubert/out-of-box/blob/main/configs/outofbox.service "copy file from here")

    `sudo nano /etc/systemd/system/outofbox.service`

    `sudo systemctl enable outofbox.service`

    `sudo systemctl start outofbox.service`
