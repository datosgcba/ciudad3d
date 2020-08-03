# Generated by Django 3.0.6 on 2020-06-12 20:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('componentes', '0011_auto_20200612_2005'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='tarjeta_evolucion',
            options={'verbose_name': 'Tarjeta Evolucion', 'verbose_name_plural': 'Tarjetas Evolucion'},
        ),
        migrations.AddField(
            model_name='tarjeta_evolucion',
            name='acumular',
            field=models.BooleanField(default=False, verbose_name='Desea Agrupar'),
        ),
        migrations.AddField(
            model_name='tarjeta_porcentaje',
            name='acumular',
            field=models.BooleanField(default=False, verbose_name='Desea Agrupar'),
        ),
        migrations.AlterField(
            model_name='tarjeta_evolucion',
            name='funcion_agrupacion',
            field=models.CharField(choices=[('cantidad_por', 'cantidad_por'), ('total_por', 'total_por')], default='', max_length=256, verbose_name='Funcion de Agrupacion'),
        ),
        migrations.AlterField(
            model_name='tarjeta_evolucion_suma',
            name='funcion_agrupacion',
            field=models.CharField(choices=[('cantidad_por', 'cantidad_por'), ('total_por', 'total_por')], default='', max_length=256, verbose_name='Funcion de Agrupacion'),
        ),
        migrations.AlterField(
            model_name='tarjeta_porcentaje',
            name='funcion_agrupacion',
            field=models.CharField(choices=[('cantidad_por', 'cantidad_por'), ('total_por', 'total_por')], default='', max_length=256, verbose_name='Funcion de Agrupacion'),
        ),
    ]