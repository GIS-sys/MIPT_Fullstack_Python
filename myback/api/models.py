from django.db import models
from django.db.models.fields import (
    CharField,
    TextField,
    AutoField,
    IntegerField,
    BooleanField,
    DateField
)
from datetime import date

# Create your models here.
class StoreFile(models.Model):
    id = AutoField(primary_key=True)
    filename = CharField(max_length=255)
    author = CharField(max_length=255)
    content = TextField()
    original_name = CharField(max_length=255)
    extension = CharField(max_length=16)
    date = DateField(default=date.today)
    is_deleted = BooleanField(default=False)

    def __str__(self):
        return f'{self.id}) {self.filename}'

