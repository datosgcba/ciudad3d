# Generated by Django 3.0.5 on 2020-06-11 13:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('componentes', '0002_auto_20200611_1220'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='grafico_de_barras',
            options={'verbose_name_plural': 'Graficos de Barras'},
        ),
        migrations.AlterModelOptions(
            name='grafico_lineas',
            options={'verbose_name_plural': 'Graficos de Lineas'},
        ),
        migrations.AddField(
            model_name='grafico_barras_y_lineas',
            name='leyenda2',
            field=models.CharField(default='', max_length=256, verbose_name='Leyenda2'),
        ),
    ]