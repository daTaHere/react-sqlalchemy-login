from setuptools import find_packages,setup

setup(name='Dashboard',
      version='1.0',
      description='Python Dashboard API',
      author='Data Here',
      author_email='datahere@python.net',
      url='https://www.python.org/sigs/distutils-sig/',
      packages=find_packages('src', exclude=[]),
      package_dir={'': 'src'},
     )
