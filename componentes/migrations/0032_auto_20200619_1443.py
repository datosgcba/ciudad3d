# Generated by Django 3.0.5 on 2020-06-19 14:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('componentes', '0031_remove_componente_campo_fecha'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tarjeta_evolucion',
            name='muestra',
            field=models.IntegerField(blank=True, default=15, null=True, verbose_name='Muestra'),
        ),
    ]