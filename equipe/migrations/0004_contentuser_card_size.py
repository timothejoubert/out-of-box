# Generated by Django 3.1.8 on 2022-01-07 11:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('equipe', '0003_auto_20211222_1916'),
    ]

    operations = [
        migrations.AddField(
            model_name='contentuser',
            name='card_size',
            field=models.CharField(choices=[('square', 'square'), ('horizontal', 'horizontal'), ('vertical', 'vertical')], default='square', max_length=10, null=True),
        ),
    ]
