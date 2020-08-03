# Generated by Django 3.0.6 on 2020-06-23 15:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('datasets', '0017_sisa_hisopados_confirmados_dia'),
    ]

    operations = [
        migrations.CreateModel(
            name='Sisa_positivos_genero',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateField(blank=True, null=True, verbose_name='Fecha')),
                ('eje_x', models.CharField(max_length=256, null=True, verbose_name='Fecha')),
                ('eje_y', models.IntegerField(null=True, verbose_name='Cantidad')),
            ],
            options={
                'db_table': 'dataset_sisa_positivos_genero',
                'managed': False,
            },
        ),
    ]