# Generated by Django 3.0.5 on 2020-06-24 14:56

import colorfield.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('componentes', '0060_auto_20200624_1305'),
    ]

    operations = [
        migrations.AddField(
            model_name='tarjeta',
            name='color',
            field=colorfield.fields.ColorField(default='#fdd306', help_text='Se muestra debajo de todo', max_length=18),
        ),
    ]