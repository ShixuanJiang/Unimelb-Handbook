# Generated by Django 5.1.1 on 2024-09-11 08:54

import django.core.validators
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('course_id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('code', models.CharField(max_length=10, unique=True, validators=[django.core.validators.RegexValidator(message='课程代码必须是4个大写字母加上5位数字，如COMP20006', regex='^[A-Z]{4}\\d{5}$')])),
                ('info', models.CharField(max_length=255)),
                ('credits', models.PositiveIntegerField()),
                ('url', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='CoursePlan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('semester', models.CharField(max_length=50)),
                ('course', models.ManyToManyField(to='blog.course')),
                ('student_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
