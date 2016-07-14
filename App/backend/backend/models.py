from django.db import models

# Class for individual article of clothing, this will be separate from the image class we 
# send to the servers.
class Piece(models.Model):
	brand = models.CharField(max_length=50)
	size = models.CharField(max_length=10)
	articleType = models.CharField(max_length=50)
	pattern = models.CharField(max_length=50)
	# mainColor = models.CharField(max_length=50)
	photo = models.ImageField(upload_to='images')

	# Constructor for basic article of clothing, with exception handling
	@classmethod
	def create(self, brand, size, articleType, pattern, photo):
		try:
			self.brand = brand
			self.size = size
			self.articleType = articleType
			self.pattern = pattern
			# self.mainColor = mainColor
			self.photo = photo
		except AttributeError:
			# This is the part where we find out WTF exception handling is in Python

# Image class, may or may not be necessary (might just consider it as part of the article
# of clothing)
class Image(models.Model):

# Class that handles Kuler objects. Again, may not be necessary, but each array entry contains
# information about each palette, and there's usually five.
class kuler(models.Model):

# Class that handles the Colour Lovers information. The array returned contains a RIDICULOUS AMOUNT
# of information that isn't needed for this application, so we'll include the important parts only.
class colourLovers(models.Model):

# This should probably be a subcategory of the article of clothing.
class matchedClothing(models.Model):

# Debating between creating a single color object that can be mapped to many different articles
# or including color as an attribute to the article and not its own class.
class color(models.Model):
	# Colors will display a "Many to Many" relationship, as an article of clothing can have
	# different colors, and a color can be in different articles of clothing.
	# This way, searching doesn't include searching EACH ARTICLE OF CLOTHING for a match, but rather
	# returns the foreign keys of the specific color.
	pieces = models.ManyToManyField(Piece)

	color = models.CharField(max_length=50)
	name = models.CharField(max_length=50)

	@classmethod
	def create(hashValue, name)
		self.color = hashValue
		self.name = name
