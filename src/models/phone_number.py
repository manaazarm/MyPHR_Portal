# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from openapi_server.models.base_model_ import Model
from openapi_server import util


class PhoneNumber(Model):
    """NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).

    Do not edit the class manually.
    """

    def __init__(self, phone_num_id=None, client_id=None, healthcare_provider_id=None, is_active=None, start_date=None, end_date=None, country_code=None, number=None):  # noqa: E501
        """PhoneNumber - a model defined in OpenAPI

        :param phone_num_id: The phone_num_id of this PhoneNumber.  # noqa: E501
        :type phone_num_id: str
        :param client_id: The client_id of this PhoneNumber.  # noqa: E501
        :type client_id: str
        :param healthcare_provider_id: The healthcare_provider_id of this PhoneNumber.  # noqa: E501
        :type healthcare_provider_id: str
        :param is_active: The is_active of this PhoneNumber.  # noqa: E501
        :type is_active: bool
        :param start_date: The start_date of this PhoneNumber.  # noqa: E501
        :type start_date: date
        :param end_date: The end_date of this PhoneNumber.  # noqa: E501
        :type end_date: date
        :param country_code: The country_code of this PhoneNumber.  # noqa: E501
        :type country_code: str
        :param number: The number of this PhoneNumber.  # noqa: E501
        :type number: str
        """
        self.openapi_types = {
            'phone_num_id': str,
            'client_id': str,
            'healthcare_provider_id': str,
            'is_active': bool,
            'start_date': date,
            'end_date': date,
            'country_code': str,
            'number': str
        }

        self.attribute_map = {
            'phone_num_id': 'phone_num_id',
            'client_id': 'client_id',
            'healthcare_provider_id': 'healthcare_provider_id',
            'is_active': 'is_active',
            'start_date': 'start_date',
            'end_date': 'end_date',
            'country_code': 'country_code',
            'number': 'number'
        }

        self._phone_num_id = phone_num_id
        self._client_id = client_id
        self._healthcare_provider_id = healthcare_provider_id
        self._is_active = is_active
        self._start_date = start_date
        self._end_date = end_date
        self._country_code = country_code
        self._number = number

    @classmethod
    def from_dict(cls, dikt) -> 'PhoneNumber':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The PhoneNumber of this PhoneNumber.  # noqa: E501
        :rtype: PhoneNumber
        """
        return util.deserialize_model(dikt, cls)

    @property
    def phone_num_id(self):
        """Gets the phone_num_id of this PhoneNumber.


        :return: The phone_num_id of this PhoneNumber.
        :rtype: str
        """
        return self._phone_num_id

    @phone_num_id.setter
    def phone_num_id(self, phone_num_id):
        """Sets the phone_num_id of this PhoneNumber.


        :param phone_num_id: The phone_num_id of this PhoneNumber.
        :type phone_num_id: str
        """

        self._phone_num_id = phone_num_id

    @property
    def client_id(self):
        """Gets the client_id of this PhoneNumber.


        :return: The client_id of this PhoneNumber.
        :rtype: str
        """
        return self._client_id

    @client_id.setter
    def client_id(self, client_id):
        """Sets the client_id of this PhoneNumber.


        :param client_id: The client_id of this PhoneNumber.
        :type client_id: str
        """

        self._client_id = client_id

    @property
    def healthcare_provider_id(self):
        """Gets the healthcare_provider_id of this PhoneNumber.


        :return: The healthcare_provider_id of this PhoneNumber.
        :rtype: str
        """
        return self._healthcare_provider_id

    @healthcare_provider_id.setter
    def healthcare_provider_id(self, healthcare_provider_id):
        """Sets the healthcare_provider_id of this PhoneNumber.


        :param healthcare_provider_id: The healthcare_provider_id of this PhoneNumber.
        :type healthcare_provider_id: str
        """

        self._healthcare_provider_id = healthcare_provider_id

    @property
    def is_active(self):
        """Gets the is_active of this PhoneNumber.


        :return: The is_active of this PhoneNumber.
        :rtype: bool
        """
        return self._is_active

    @is_active.setter
    def is_active(self, is_active):
        """Sets the is_active of this PhoneNumber.


        :param is_active: The is_active of this PhoneNumber.
        :type is_active: bool
        """

        self._is_active = is_active

    @property
    def start_date(self):
        """Gets the start_date of this PhoneNumber.


        :return: The start_date of this PhoneNumber.
        :rtype: date
        """
        return self._start_date

    @start_date.setter
    def start_date(self, start_date):
        """Sets the start_date of this PhoneNumber.


        :param start_date: The start_date of this PhoneNumber.
        :type start_date: date
        """

        self._start_date = start_date

    @property
    def end_date(self):
        """Gets the end_date of this PhoneNumber.


        :return: The end_date of this PhoneNumber.
        :rtype: date
        """
        return self._end_date

    @end_date.setter
    def end_date(self, end_date):
        """Sets the end_date of this PhoneNumber.


        :param end_date: The end_date of this PhoneNumber.
        :type end_date: date
        """

        self._end_date = end_date

    @property
    def country_code(self):
        """Gets the country_code of this PhoneNumber.


        :return: The country_code of this PhoneNumber.
        :rtype: str
        """
        return self._country_code

    @country_code.setter
    def country_code(self, country_code):
        """Sets the country_code of this PhoneNumber.


        :param country_code: The country_code of this PhoneNumber.
        :type country_code: str
        """

        self._country_code = country_code

    @property
    def number(self):
        """Gets the number of this PhoneNumber.


        :return: The number of this PhoneNumber.
        :rtype: str
        """
        return self._number

    @number.setter
    def number(self, number):
        """Sets the number of this PhoneNumber.


        :param number: The number of this PhoneNumber.
        :type number: str
        """

        self._number = number
