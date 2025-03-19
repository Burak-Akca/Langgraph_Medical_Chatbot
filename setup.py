from setuptools import setup,find_packages

with open("requirements.txt") as f:
    requirements = f.read().splitlines()

setup(
    name="LLM-MEDICAL_CHATBOT-PROJECT",
    version="0.1",
    author="burak-akca",
    packages=find_packages(),
    install_requires = requirements,
)