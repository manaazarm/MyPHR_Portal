# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from openapi_server.models.base_model_ import Model
from openapi_server import util


class Caregiver(Model):
    """NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).

    Do not edit the class manually.
    """

    def __init__(self, client_id=None, firstname=None, surname=None, gender=None, dob=None, service_language=None, profile_start_date=None, profile_end_date=None, relationship=None, is_active=None, is_primary_caregiver=None):  # noqa: E501
        """Caregiver - a model defined in OpenAPI

        :param client_id: The client_id of this Caregiver.  # noqa: E501
        :type client_id: str
        :param firstname: The firstname of this Caregiver.  # noqa: E501
        :type firstname: str
        :param surname: The surname of this Caregiver.  # noqa: E501
        :type surname: str
        :param gender: The gender of this Caregiver.  # noqa: E501
        :type gender: GenderType
        :param dob: The dob of this Caregiver.  # noqa: E501
        :type dob: date
        :param service_language: The service_language of this Caregiver.  # noqa: E501
        :type service_language: ServiceLanguage
        :param profile_start_date: The profile_start_date of this Caregiver.  # noqa: E501
        :type profile_start_date: date
        :param profile_end_date: The profile_end_date of this Caregiver.  # noqa: E501
        :type profile_end_date: date
        :param relationship: The relationship of this Caregiver.  # noqa: E501
        :type relationship: str
        :param is_active: The is_active of this Caregiver.  # noqa: E501
        :type is_active: bool
        :param is_primary_caregiver: The is_primary_caregiver of this Caregiver.  # noqa: E501
        :type is_primary_caregiver: bool
        """
        self.openapi_types = {
            'client_id': str,
            'firstname': str,
            'surname': str,
            'gender': GenderType,
            'dob': date,
            'service_language': ServiceLanguage,
            'profile_start_date': date,
            'profile_end_date': date,
            'relationship': str,
            'is_active': bool,
            'is_primary_caregiver': bool
        }

        self.attribute_map = {
            'client_id': 'client_id',
            'firstname': 'firstname',
            'surname': 'surname',
            'gender': 'gender',
            'dob': 'dob',
            'service_language': 'service_language',
            'profile_start_date': 'profile_start_date',
            'profile_end_date': 'profile_end_date',
            'relationship': 'relationship',
            'is_active': 'is_active',
            'is_primary_caregiver': 'is_primary_caregiver'
        }

        self._client_id = client_id
        self._firstname = firstname
        self._surname = surname
        self._gender = gender
        self._dob = dob
        self._service_language = service_language
        self._profile_start_date = profile_start_date
        self._profile_end_date = profile_end_date
        self._relationship = relationship
        self._is_active = is_active
        self._is_primary_caregiver = is_primary_caregiver

    @classmethod
    def from_dict(cls, dikt) -> 'Caregiver':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The Caregiver of this Caregiver.  # noqa: E501
        :rtype: Caregiver
        """
        return util.deserialize_model(dikt, cls)

    @property
    def client_id(self):
        """Gets the client_id of this Caregiver.


        :return: The client_id of this Caregiver.
        :rtype: str
        """
        return self._client_id

    @client_id.setter
    def client_id(self, client_id):
        """Sets the client_id of this Caregiver.


        :param client_id: The client_id of this Caregiver.
        :type client_id: str
        """

        self._client_id = client_id

    @property
    def firstname(self):
        """Gets the firstname of this Caregiver.


        :return: The firstname of this Caregiver.
        :rtype: str
        """
        return self._firstname

    @firstname.setter
    def firstname(self, firstname):
        """Sets the firstname of this Caregiver.


        :param firstname: The firstname of this Caregiver.
        :type firstname: str
        """

        self._firstname = firstname

    @property
    def surname(self):
        """Gets the surname of this Caregiver.


        :return: The surname of this Caregiver.
        :rtype: str
        """
        return self._surname

    @surname.setter
    def surname(self, surname):
        """Sets the surname of this Caregiver.


        :param surname: The surname of this Caregiver.
        :type surname: str
        """

        self._surname = surname

    @property
    def gender(self):
        """Gets the gender of this Caregiver.


        :return: The gender of this Caregiver.
        :rtype: GenderType
        """
        return self._gender

    @gender.setter
    def gender(self, gender):
        """Sets the gender of this Caregiver.


        :param gender: The gender of this Caregiver.
        :type gender: GenderType
        """

        self._gender = gender

    @property
    def dob(self):
        """Gets the dob of this Caregiver.


        :return: The dob of this Caregiver.
        :rtype: date
        """
        return self._dob

    @dob.setter
    def dob(self, dob):
        """Sets the dob of this Caregiver.


        :param dob: The dob of this Caregiver.
        :type dob: date
        """

        self._dob = dob

    @property
    def service_language(self):
        """Gets the service_language of this Caregiver.


        :return: The service_language of this Caregiver.
        :rtype: ServiceLanguage
        """
        return self._service_language

    @service_language.setter
    def service_language(self, service_language):
        """Sets the service_language of this Caregiver.


        :param service_language: The service_language of this Caregiver.
        :type service_language: ServiceLanguage
        """

        self._service_language = service_language

    @property
    def profile_start_date(self):
        """Gets the profile_start_date of this Caregiver.

        a new client profile may start when they change names or gender  # noqa: E501

        :return: The profile_start_date of this Caregiver.
        :rtype: date
        """
        return self._profile_start_date

    @profile_start_date.setter
    def profile_start_date(self, profile_start_date):
        """Sets the profile_start_date of this Caregiver.

        a new client profile may start when they change names or gender  # noqa: E501

        :param profile_start_date: The profile_start_date of this Caregiver.
        :type profile_start_date: date
        """

        self._profile_start_date = profile_start_date

    @property
    def profile_end_date(self):
        """Gets the profile_end_date of this Caregiver.

        a client profile may end when they change names or gender  # noqa: E501

        :return: The profile_end_date of this Caregiver.
        :rtype: date
        """
        return self._profile_end_date

    @profile_end_date.setter
    def profile_end_date(self, profile_end_date):
        """Sets the profile_end_date of this Caregiver.

        a client profile may end when they change names or gender  # noqa: E501

        :param profile_end_date: The profile_end_date of this Caregiver.
        :type profile_end_date: date
        """

        self._profile_end_date = profile_end_date

    @property
    def relationship(self):
        """Gets the relationship of this Caregiver.

        who the caregiver is to patient  # noqa: E501

        :return: The relationship of this Caregiver.
        :rtype: str
        """
        return self._relationship

    @relationship.setter
    def relationship(self, relationship):
        """Sets the relationship of this Caregiver.

        who the caregiver is to patient  # noqa: E501

        :param relationship: The relationship of this Caregiver.
        :type relationship: str
        """

        self._relationship = relationship

    @property
    def is_active(self):
        """Gets the is_active of this Caregiver.


        :return: The is_active of this Caregiver.
        :rtype: bool
        """
        return self._is_active

    @is_active.setter
    def is_active(self, is_active):
        """Sets the is_active of this Caregiver.


        :param is_active: The is_active of this Caregiver.
        :type is_active: bool
        """

        self._is_active = is_active

    @property
    def is_primary_caregiver(self):
        """Gets the is_primary_caregiver of this Caregiver.


        :return: The is_primary_caregiver of this Caregiver.
        :rtype: bool
        """
        return self._is_primary_caregiver

    @is_primary_caregiver.setter
    def is_primary_caregiver(self, is_primary_caregiver):
        """Sets the is_primary_caregiver of this Caregiver.


        :param is_primary_caregiver: The is_primary_caregiver of this Caregiver.
        :type is_primary_caregiver: bool
        """

        self._is_primary_caregiver = is_primary_caregiver
