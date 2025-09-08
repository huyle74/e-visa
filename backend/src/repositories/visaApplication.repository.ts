import prisma from "@/prisma/prisma";
import {
  Eligibility,
  Application,
  ApplyInformation,
  TravelInformation,
  SupportingDocument,
  Document,
} from "@prisma/client";
import {
  TravelInformationInputDto,
  ApplicationInformationInputDto,
  SupportingDocumentInputDto,
} from "@/dto/visaApply/visaApply.dto";

export const visaApplicationRepo = {
  async create(userId: string): Promise<Application> {
    try {
      const createApplication = await prisma.application.create({
        data: { userId },
      });
      return createApplication;
    } catch (error) {
      console.log(error);
      throw new Error("Cannot create new application");
    }
  },

  async findOne(id: string) {
    try {
      const find = await prisma.application.findUnique({ where: { correlationId: id } });
      return find;
    } catch (error) {
      console.log(error);
      throw new Error("Cannot find application");
    }
  },

  async delete(applicationId: string) {
    try {
      const removeApplication = await prisma.application.delete({
        where: { correlationId: applicationId },
      });

      return removeApplication;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to delete application");
    }
  },

  async listAll(userId: string) {
    try {
      const list = await prisma.application.findMany({
        where: { userId },
        take: 10,
        orderBy: { createdAt: "desc" },
        select: {
          correlationId: true,
          createdAt: true,
          Eligibility: {
            select: {
              applyAt: true,
              visaType: true,
            },
          },
          ApplyInformation: {
            select: {
              familyName: true,
              firstName: true,
              nationality: true,
              birthDate: true,
              documentNumber: true,
            },
          },
        },
      });

      return list;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to find application by user ID");
    }
  },
};

export const eligibiltyRepo = {
  async create(applicationId: string, data: any): Promise<Eligibility> {
    try {
      const newEligibilty = await prisma.eligibility.create({
        data: { ...data, applicationId },
      });
      return newEligibilty;
    } catch (error) {
      console.log(error);
      throw new Error("Cannot create Eligibilty form");
    }
  },

  async update(applicationId: string, data: any): Promise<Eligibility> {
    try {
      const update = await prisma.eligibility.update({
        where: { applicationId },
        data,
      });
      return update;
    } catch (error) {
      console.log(error);
      throw new Error("Cannot Update Eligibilty form");
    }
  },

  async findOne(applicationId: string): Promise<Eligibility | null> {
    try {
      const find = await prisma.eligibility.findUnique({
        where: { applicationId },
      });
      return find;
    } catch (error) {
      console.log(error);
      throw new Error("Cannot find this Eligibilty form");
    }
  },
};

// 2ND step applyInformation
export const applyInformationRepo = {
  async upsert(data: ApplicationInformationInputDto): Promise<ApplyInformation> {
    try {
      const {
        applicationId,
        otherNationality,
        currentAddress,
        birthDate,
        expiryDate,
        issuesDate,
        ...rest
      } = data;
      return prisma.applyInformation.upsert({
        where: { applicationId },
        create: {
          ...rest,
          currentAddress: Boolean(currentAddress),
          otherNationality: Boolean(otherNationality),
          birthDate: new Date(birthDate),
          expiryDate: new Date(expiryDate),
          issuesDate: new Date(issuesDate),
          application: { connect: { correlationId: applicationId } },
        },
        update: {
          ...rest,
          currentAddress: Boolean(currentAddress),
          birthDate: new Date(birthDate),
          expiryDate: new Date(expiryDate),
          issuesDate: new Date(issuesDate),
          otherNationality: Boolean(otherNationality),
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error("Cannot upsert Application information form");
    }
  },

  async create(applicationId: string, data: any): Promise<ApplyInformation> {
    try {
      const createNew = await prisma.applyInformation.create({
        data: { ...data, applicationId },
      });
      return createNew;
    } catch (error) {
      console.log(error);
      throw new Error("Cannot create Application information form");
    }
  },

  async findOne(applicationId: string): Promise<ApplyInformation | null> {
    try {
      const find = await prisma.applyInformation.findUnique({
        where: { applicationId },
      });
      return find;
    } catch (error) {
      console.log(error);
      throw new Error("Cannot find this Eligibilty form");
    }
  },

  async update(applicationId: string, data: any): Promise<ApplyInformation> {
    try {
      const update = await prisma.applyInformation.update({
        where: { applicationId },
        data,
      });
      return update;
    } catch (error) {
      console.log(error);
      throw new Error("Cannot create Application information form");
    }
  },
};

export const travelInfoRepos = {
  async upsert(data: TravelInformationInputDto): Promise<TravelInformation | undefined> {
    try {
      const { accommodations = [], applicationId, ...rest } = data;

      const upsert = await prisma.travelInformation.upsert({
        where: { applicationId },
        update: {
          ...rest,
          accommodations: accommodations.length
            ? {
                deleteMany: {},
                create: accommodations,
              }
            : undefined,
        },
        create: {
          ...rest,
          application: { connect: { correlationId: applicationId } },
          accommodations: accommodations.length ? { create: accommodations } : undefined,
        },
      });

      return upsert;
    } catch (error: any) {
      console.log(error);
      throw new Error("Failed to upsert travel information of user");
    }
  },

  async create(applicationId: string, data: any): Promise<TravelInformation> {
    try {
      const create = await prisma.travelInformation.create({
        data: { ...data, applicationId },
      });

      return create;
    } catch (error) {
      console.log(error);
      throw new Error("Cannot create travel information form");
    }
  },

  async findOne(applicationId: string) {
    try {
      const find = await prisma.travelInformation.findUnique({
        where: { applicationId },
        include: {
          accommodations: {
            select: {
              id: false,
              type: true,
              name: true,
              street: true,
              city: true,
              contactNo: true,
              duration: true,
            },
          },
        },
      });
      return find;
    } catch (error) {
      console.log(error);
      throw new Error("Cannot create travel information form");
    }
  },

  async update(applicationId: string, data: any) {
    try {
      const update = await prisma.travelInformation.update({
        data,
        where: { applicationId },
      });
      return update;
    } catch (error) {
      console.log(error);
      throw new Error("Cannot create travel information form");
    }
  },
};

export const supportingDocumentRepos = {
  async upsert(data: SupportingDocumentInputDto): Promise<SupportingDocument> {
    try {
      const { applicationId, ...rest } = data;

      const rows = await prisma.supportingDocument.upsert({
        where: {
          applicationId_type: {
            applicationId,
            type: rest.type,
          },
        },
        update: rest,
        create: { ...rest, application: { connect: { correlationId: applicationId } } },
      });

      return rows;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to upsert suporting document");
    }
  },

  async findOne(applicationId: string, type: Document) {
    try {
      const file = await prisma.supportingDocument.findUnique({
        where: { applicationId_type: { applicationId, type } },
        select: { originalName: true, mimeType: true, storageKey: true, sizeBytes: true },
      });

      return file;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to get suporting document file");
    }
  },
};
