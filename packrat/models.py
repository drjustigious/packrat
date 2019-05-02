from django.db import models



class Packable(models.Model):
    """
    This model represents any packable item that can be a part of a loadout.
    Here, the pack frame, or the outermost part of the loadout in general,
    is also considered a packable item.
    """
    name = models.CharField(max_length=256, verbose_name="item name")
    description = models.CharField(max_length=512, verbose_name="item description text")
    mass = models.FloatField(verbose_name="item mass in grams")
    date = models.DateTimeField(auto_now=True, verbose_name="last modification timestamp")
    cost = models.DecimalField(max_digits=9, decimal_places=2, verbose_name="procurement cost in EUR")
    vendor = models.CharField(max_length=256, verbose_name="vendor or other procurement source")
    is_consumable = models.BooleanField()


class Loadout(models.Model):
    """
    This model represents a loadout plan, including creation metadata and a
    foreign key relation to the "root item" which should be the outermost packable item
    (usually the pack frame).
    """
    name = models.CharField(max_length=256, verbose_name="loadout name")
    author = models.CharField(max_length=256, verbose_name="author of the loadout")
    date = models.DateTimeField(auto_now=True, verbose_name="last modification timestamp")
    description = models.CharField(max_length=512, verbose_name="loadout description text")

    # Use hashlib.sha512 and hashlib.hexdigest to get a 128-character hash string of every password
    password = models.CharField(max_length=128, verbose_name="password hash string")
    root_item = models.ForeignKey(Packable, on_delete=models.CASCADE)


class PackingRelation(models.Model):
    """
    This model describes the hierarchy in which items are packed. Each row of the
    corresponding database table will record the relevant loadout ID and the ID's
    of the parent and child items (or the container and the contained item,
    respectively).
    """
    loadout = models.ForeignKey(Loadout, on_delete=models.CASCADE)
    container_packable = models.ForeignKey(Packable, related_name="container_packables", on_delete=models.CASCADE)
    contained_packable = models.ForeignKey(Packable, related_name="contained_packables", on_delete=models.CASCADE)