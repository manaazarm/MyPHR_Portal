# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from openapi_server.models.base_model_ import Model
from openapi_server import util


class WebUser(Model):
    """NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).

    Do not edit the class manually.
    """

    def __init__(self, user_id=None, client_id=None, healthcare_provider_id=None, status=None, created_date=None, type=None, hcn=None, password=None):  # noqa: E501
        """WebUser - a model defined in OpenAPI

        :param user_id: The user_id of this WebUser.  # noqa: E501
        :type user_id: str
        :param client_id: The client_id of this WebUser.  # noqa: E501
        :type client_id: str
        :param healthcare_provider_id: The healthcare_provider_id of this WebUser.  # noqa: E501
        :type healthcare_provider_id: str
        :param status: The status of this WebUser.  # noqa: E501
        :type status: str
        :param created_date: The created_date of this WebUser.  # noqa: E501
        :type created_date: date
        :param type: The type of this WebUser.  # noqa: E501
        :type type: str
        :param hcn: The hcn of this WebUser.  # noqa: E501
        :type hcn: str
        :param password: The password of this WebUser.  # noqa: E501
        :type password: str
        """
        self.openapi_types = {
            'user_id': str,
            'client_id': str,
            'healthcare_provider_id': str,
            'status': str,
            'created_date': date,
            'type': str,
            'hcn': str,
            'password': str
        }

        self.attribute_map = {
            'user_id': 'user_id',
            'client_id': 'client_id',
            'healthcare_provider_id': 'healthcare_provider_id',
            'status': 'status',
            'created_date': 'created_date',
            'type': 'type',
            'hcn': 'hcn',
            'password': 'password'
        }

        self._user_id = user_id
        self._client_id = client_id
        self._healthcare_provider_id = healthcare_provider_id
        self._status = status
        self._created_date = created_date
        self._type = type
        self._hcn = hcn
        self._password = password

    @classmethod
    def from_dict(cls, dikt) -> 'WebUser':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The WebUser of this WebUser.  # noqa: E501
        :rtype: WebUser
        """
        return util.deserialize_model(dikt, cls)

    @property
    def user_id(self):
        """Gets the user_id of this WebUser.


        :return: The user_id of this WebUser.
        :rtype: str
        """
        return self._user_id

    @user_id.setter
    def user_id(self, user_id):
        """Sets the user_id of this WebUser.


        :param user_id: The user_id of this WebUser.
        :type user_id: str
        """

        self._user_id = user_id

    @property
    def client_id(self):
        """Gets the client_id of this WebUser.


        :return: The client_id of this WebUser.
        :rtype: str
        """
        return self._client_id

    @client_id.setter
    def client_id(self, client_id):
        """Sets the client_id of this WebUser.


        :param client_id: The client_id of this WebUser.
        :type client_id: str
        """

        self._client_id = client_id

    @property
    def healthcare_provider_id(self):
        """Gets the healthcare_provider_id of this WebUser.


        :return: The healthcare_provider_id of this WebUser.
        :rtype: str
        """
        return self._healthcare_provider_id

    @healthcare_provider_id.setter
    def healthcare_provider_id(self, healthcare_provider_id):
        """Sets the healthcare_provider_id of this WebUser.


        :param healthcare_provider_id: The healthcare_provider_id of this WebUser.
        :type healthcare_provider_id: str
        """

        self._healthcare_provider_id = healthcare_provider_id

    @property
    def status(self):
        """Gets the status of this WebUser.


        :return: The status of this WebUser.
        :rtype: str
        """
        return self._status

    @status.setter
    def status(self, status):
        """Sets the status of this WebUser.


        :param status: The status of this WebUser.
        :type status: str
        """

        self._status = status

    @property
    def created_date(self):
        """Gets the created_date of this WebUser.


        :return: The created_date of this WebUser.
        :rtype: date
        """
        return self._created_date

    @created_date.setter
    def created_date(self, created_date):
        """Sets the created_date of this WebUser.


        :param created_date: The created_date of this WebUser.
        :type created_date: date
        """

        self._created_date = created_date

    @property
    def type(self):
        """Gets the type of this WebUser.


        :return: The type of this WebUser.
        :rtype: str
        """
        return self._type

    @type.setter
    def type(self, type):
        """Sets the type of this WebUser.


        :param type: The type of this WebUser.
        :type type: str
        """

        self._type = type

    @property
    def hcn(self):
        """Gets the hcn of this WebUser.


        :return: The hcn of this WebUser.
        :rtype: str
        """
        return self._hcn

    @hcn.setter
    def hcn(self, hcn):
        """Sets the hcn of this WebUser.


        :param hcn: The hcn of this WebUser.
        :type hcn: str
        """

        self._hcn = hcn

    @property
    def password(self):
        """Gets the password of this WebUser.


        :return: The password of this WebUser.
        :rtype: str
        """
        return self._password

    @password.setter
    def password(self, password):
        """Sets the password of this WebUser.


        :param password: The password of this WebUser.
        :type password: str
        """

        self._password = password